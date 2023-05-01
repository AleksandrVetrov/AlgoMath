package com.boots.service;


import com.boots.payload.response.ResponseFile;
import io.minio.*;
import io.minio.errors.*;
import io.minio.http.Method;
import lombok.extern.slf4j.Slf4j;
import org.apache.tomcat.util.http.fileupload.IOUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.util.UriUtils;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.Map;
import java.util.Objects;
import java.util.UUID;

@Slf4j
@Component
public class MinioService {

    @Value("${minio.url}")
    private String endPoint;
    @Value("minio.bucket.name")
    private String bucketName;
    private MinioClient client;

    public MinioProperties minioProperties;

    public ResponseFile uploadFile(MultipartFile multipartFile) throws IOException, InternalException, ServerException,
            InsufficientDataException, ErrorResponseException, NoSuchAlgorithmException, InvalidKeyException,
            InvalidResponseException, XmlParserException {

        boolean foundBucket = client.bucketExists(BucketExistsArgs.builder().bucket(bucketName).build());
        if (!foundBucket) {
            log.info("create bucket: [{}]", bucketName);
            client.makeBucket(MakeBucketArgs.builder().bucket(bucketName).build());
        } else {
            log.info("bucket '{}' already exists.", bucketName);
        }

        try (InputStream inputStream = multipartFile.getInputStream()) {

            String uploadName = UUID.randomUUID() + "_" +
                    Objects.requireNonNull(multipartFile.getOriginalFilename())
                            .substring(multipartFile.getOriginalFilename()
                                    .lastIndexOf("."));

            PutObjectArgs putObjectOptions = PutObjectArgs.builder()
                    .bucket(bucketName)
                    .object(uploadName)
                    .contentType(multipartFile.getContentType())
                    .stream(inputStream, multipartFile.getSize(), -1)
                    .build();
            client.putObject(putObjectOptions);

            final String url = endPoint + "/" + bucketName + "/" + UriUtils.encode(uploadName, StandardCharsets.UTF_8);

            return ResponseFile.builder()
                    .uploadName(uploadName)
                    .url(url)
                    .realName(multipartFile.getOriginalFilename())
                    .size(multipartFile.getSize())
                    .bucket(bucketName)
                    .build();
        }
    }

    public void removeFile(String fileName) throws ServerException, InsufficientDataException, ErrorResponseException, IOException, NoSuchAlgorithmException, InvalidKeyException, InvalidResponseException, XmlParserException, InternalException {
        client.removeObject(RemoveObjectArgs.builder()
                .bucket(bucketName)
                .object(fileName)
                .build());
    }


    public void download(HttpServletResponse response, String fileName, String realName) throws Exception {
        InputStream in = null;
        try {
            StatObjectResponse stat = client.statObject(StatObjectArgs.builder().bucket(bucketName)
                    .object(fileName)
                    .build());
            response.setContentType(stat.contentType());
            response.setHeader("Content-disposition", "attachment;filename=" +
                    new String(realName.getBytes("gb2312"),
                            "ISO8859-1"));
            in = client.getObject(GetObjectArgs.builder()
                    .bucket(bucketName)
                    .object(fileName)
                    .build());
            IOUtils.copy(in, response.getOutputStream());
        } finally {
            if (in != null) {
                try {
                    in.close();
                } catch (IOException e) {
                    log.error(e.getMessage(), e);
                }
            }
        }
    }


    public CreateMultipartUploadResponse uploadId(MultipartUploadCreate multipartUploadCreate) {

    }


    public CreateMultipartUploadResponse createMultipartUpload(MultipartUploadCreate multipartUploadCreate) {

    }

    public ObjectWriteResponse completeMultipartUpload(MultipartUploadCreate multipartUploadCreate) {

    }


    public ListPartsResponse listMultipart(MultipartUploadCreate multipartUploadCreate) {

    }


    public String getPresignedObjectUrl(String bucketName, String objectName, Map<String, String> queryParams) {
        try {
            return client.getPresignedObjectUrl(
                    GetPresignedObjectUrlArgs.builder()
                            .method(Method.PUT)
                            .bucket(bucketName)
                            .object(objectName)
                            .expiry(60 * 60 * 24)
                            .extraQueryParams(queryParams)
                            .build());
        } catch (Exception e) {
            throw new IllegalArgumentException();
        }
    }
}