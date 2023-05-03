package com.boots.payload.request;

import java.util.List;

public class PostDTO {
    private Long id;
    private String title;
    private String content;
    private Long userId;
    private List<String> attachedFilesUrls;

    public PostDTO() {
    }

    public PostDTO(Long id, String title, String content, Long userId, List<String> attachedFilesUrls) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.userId = userId;
        this.attachedFilesUrls = attachedFilesUrls;
    }

    public void setId(Long id) {

        this.id = id;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public void setAttachedFilesUrls(List<String> attachedFilesUrls) {
        this.attachedFilesUrls = attachedFilesUrls;
    }

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getContent() {
        return content;
    }

    public Long getUserId() {
        return userId;
    }

    public List<String> getAttachedFilesUrls() {
        return attachedFilesUrls;
    }
}

