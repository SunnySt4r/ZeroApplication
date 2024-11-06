package com.example.ZeroApplication.config;

import io.minio.BucketExistsArgs;
import io.minio.MakeBucketArgs;
import io.minio.MinioClient;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;


@Configuration
@EnableConfigurationProperties(MinioProperties.class)
public class MinioConfig {

  private static final Logger logger = LoggerFactory.getLogger(MinioConfig.class);

  @Bean
  public MinioClient minioClient(MinioProperties properties) throws Exception {
    MinioClient minioClient = MinioClient.builder()
        .credentials(properties.getAccessKey(), properties.getSecretKey())
        .endpoint(properties.getUrl(), properties.getPort(), properties.isSecure())
        .build();

    boolean isExist = minioClient.bucketExists(
        BucketExistsArgs.builder().bucket(properties.getBucket()).build());
    if (!isExist) {
      minioClient.makeBucket(MakeBucketArgs.builder().bucket(properties.getBucket()).build());
      logger.info("Bucket created successfully.");
    } else {
      logger.info("Bucket already exists.");
    }
    return minioClient;
  }
}