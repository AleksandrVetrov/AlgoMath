package com.boots.service;

import com.boots.entity.Post;
import com.boots.entity.PostAttachment;
import com.boots.entity.User;
import com.boots.payload.request.PostDTO;
import com.boots.repository.PostRepository;
import com.boots.repository.UserRepository;
import io.minio.MinioClient;
import io.minio.PutObjectArgs;
import io.minio.errors.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.io.InputStream;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class PostService {

    private final PostRepository postRepository;
    private final UserRepository userRepository;
    private final MinioClient minioClient;
    private final String minioBucketName;


    public PostService(PostRepository postRepository, UserRepository userRepository, MinioClient minioClient,
                       @Value("${minio.bucket.name}") String minioBucketName) {
        this.postRepository = postRepository;
        this.userRepository = userRepository;
        this.minioClient = minioClient;
        this.minioBucketName = minioBucketName;
    }

    public Post createPost(PostDTO postDTO, MultipartFile[] files, Long userId) throws IOException, InvalidKeyException,
            NoSuchAlgorithmException, InsufficientDataException, InternalException, ErrorResponseException, ServerException, InvalidResponseException, XmlParserException {
        User user = userRepository.findById(userId)
                .orElseThrow();

        List<PostAttachment> attachments = new ArrayList<>();
        for (MultipartFile file : files) {
            String filename = file.getOriginalFilename();
            assert filename != null;
            String extension = filename.substring(filename.lastIndexOf(".") + 1);

            String objectName = UUID.randomUUID().toString() + "." + extension;
            InputStream inputStream = file.getInputStream();
            long size = file.getSize();

            minioClient.putObject(PutObjectArgs.builder()
                    .bucket(minioBucketName)
                    .object(objectName)
                    .stream(inputStream, size, -1)
                    .build());

            PostAttachment attachment = new PostAttachment();
            attachment.setFileName(filename);
            attachment.setFileSize(size);
            attachment.setFileType(extension);
            //attachment.setUrl(minioClient.getObjectUrl(minioBucketName, objectName)); надо дописать, чтобы в бд подвязывалась ссылочка на файлы к посту
            attachments.add(attachment);
        }

        Post post = new Post();
        post.setUser(user);
        post.setTitle(postDTO.getTitle());
        post.setContent(postDTO.getContent());
        post.setAttachments(attachments);
        return postRepository.save(post);
    }

    public List<Post> getAllPosts() {
        return postRepository.findAll();
    }

    public List<Post> getPostsByUserId(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow();
        return postRepository.findByUser(user);
    }

}
