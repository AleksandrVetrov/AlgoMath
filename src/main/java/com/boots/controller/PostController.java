//package com.boots.controller;
//
//import com.boots.entity.Post;
//import com.boots.payload.request.PostDTO;
//import com.boots.service.PostService;
//import io.minio.errors.*;
//import org.springframework.web.bind.annotation.*;
//import org.springframework.web.multipart.MultipartFile;
//
//import java.io.IOException;
//import java.security.InvalidKeyException;
//import java.security.NoSuchAlgorithmException;
//import java.util.List;
//
//@RestController
//@CrossOrigin(origins = "*", maxAge = 3600)
//@RequestMapping("/api/posts")
//public class PostController {
//
//    private final PostService postService;
//
//    public PostController(PostService postService) {
//        this.postService = postService;
//    }
//
//    @PostMapping("/upload")
//    public Post createPost(@RequestBody PostDTO postDTO, @RequestParam MultipartFile[] files, @RequestParam Long userId)
//            throws IOException, InvalidKeyException, InsufficientDataException,
//            InternalException, ErrorResponseException, XmlParserException, ServerException, NoSuchAlgorithmException, InvalidResponseException, io.minio.errors.InternalException {
//        return postService.createPost(postDTO, files, userId);
//    }
//
//    @GetMapping
//    public List<Post> getAllPosts() {
//        return postService.getAllPosts();
//    }
//
//    @GetMapping("/{userId}")
//    public List<Post> getPostsByUserId(@PathVariable Long userId) {
//        return postService.getPostsByUserId(userId);
//    }
//}