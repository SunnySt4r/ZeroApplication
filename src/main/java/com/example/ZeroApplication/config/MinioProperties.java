package com.example.ZeroApplication.config;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;

@Getter
@Setter
@ConfigurationProperties(prefix = "minio")
public class MinioProperties {

  private String url;
  private int port;
  private String accessKey;
  private String secretKey;
  private boolean secure;
  private String bucket;
  private long imageSize;
}