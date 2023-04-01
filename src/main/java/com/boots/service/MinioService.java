package com.boots.service;

import com.boots.payload.response.ResponseFile;
import io.minio.*;
import io.minio.messages.Item;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Slf4j
@Service
public class MinioService {

    private final MinioClient minioClient;
    private static final Logger logger = LoggerFactory.getLogger(MinioClient.class);
    @Value("${minio.bucket.name}")
    private String bucketName;

    public MinioService(MinioClient minioClient) {
        this.minioClient = minioClient;
    }

    public List<ResponseFile> getListObjects() {
        List<ResponseFile> objects = new ArrayList<>();
        try {
            Iterable<Result<Item>> result = minioClient.listObjects(ListObjectsArgs.builder()
                    .bucket(bucketName)
                    .recursive(true)
                    .build());
            for (Result<Item> item : result) {
                objects.add(ResponseFile.builder()
                        .filename(item.get().objectName())
                        .size(item.get().size())
                        .url(getPreSignedUrl(item.get().objectName()))
                        .build());
            }
            return objects;
        } catch (Exception e) {
            logger.error("Happened error when get list objects from minio: ");
        }

        return objects;
    }

    public InputStream getObject(String filename) {
        InputStream stream;
        try {
            stream = minioClient.getObject(GetObjectArgs.builder()
                    .bucket(bucketName)
                    .object(filename)
                    .build());
        } catch (Exception e) {
            logger.error("Happened error when get list objects from minio: ", e);
            return null;
        }

        return stream;
    }

    public ResponseFile uploadFile(ResponseFile request) {
        try {
//            For HTTPS (На будущее)
//            KeyGenerator keyGen = KeyGenerator.getInstance("AES");
//            keyGen.init(256);
//            ServerSideEncryptionCustomerKey ssec =
//                    new ServerSideEncryptionCustomerKey(keyGen.generateKey());

            minioClient.putObject(PutObjectArgs.builder()
                    .bucket(bucketName)
                    .object(request.getFile().getOriginalFilename())
                    .stream(request.getFile().getInputStream(), request.getFile().getSize(), -1)
                    //.sse(ssec)
                    .build());
        } catch (Exception e) {
            logger.error("Happened error when upload file: ", e);
        }
        return ResponseFile.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .size(request.getFile().getSize())
                .url(getPreSignedUrl(request.getFile().getOriginalFilename()))
                .filename(request.getFile().getOriginalFilename())
                .build();
    }

    private String getPreSignedUrl(String filename) {
        return "http://localhost:8080/file/".concat(String.valueOf(UUID.randomUUID()));
    }
}
