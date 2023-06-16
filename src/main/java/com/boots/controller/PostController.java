package com.boots.controller;

import com.boots.entity.Post;
import com.boots.entity.User;
import com.boots.payload.response.ResponseFile;
import com.boots.service.PostService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;


@RestController
@AllArgsConstructor
@RequestMapping("/api/posts")
public class PostController {

    private PostService postService;

    @PostMapping
    public ResponseEntity<Post> createPost(
            @RequestParam("title") String title,
            @RequestParam("content") String content,
            @ModelAttribute ResponseFile request,
            Principal principal) {
        User user = postService.getUserByUsername(principal.getName());
        try {
            Post post = postService.createPost(title, content, request, user);
            return ResponseEntity.ok(post);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}