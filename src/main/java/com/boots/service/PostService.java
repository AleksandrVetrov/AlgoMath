package com.boots.service;

import com.boots.entity.Post;
import com.boots.entity.PostAttachment;
import com.boots.entity.User;
import com.boots.payload.response.ResponseFile;
import com.boots.repository.PostAttachmentRepository;
import com.boots.repository.PostRepository;
import com.boots.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@AllArgsConstructor
public class PostService {

    private final PostRepository postRepository;
    private final PostAttachmentRepository attachmentRepository;
    private final MinioService minioService;
    private final UserRepository userRepository;

    @Transactional
    public Post createPost(String title, String content, ResponseFile request, User user) {
        // Create post object
        Post post = new Post();
        post.setTitle(title);
        post.setContent(content);
        post.setUser(user);

        // Save post to database
        post = postRepository.save(post);

        // Upload attachment files to Minio and save the URLs in database
        if (request != null) {
                ResponseFile responseFile = minioService.uploadFile(request);
                PostAttachment attachment = new PostAttachment();
                attachment.setFileName(responseFile.getFile().getOriginalFilename());
                attachment.setFileSize(responseFile.getSize());
                attachment.setUrl(responseFile.getUrl());
                attachment.setPost(post);
                attachmentRepository.save(attachment);
                post.getAttachments().add(attachment);

            }


        return post;
    }

    public User getUserByUsername(String name) {
       return userRepository.getUserByUsername(name);
    }
}