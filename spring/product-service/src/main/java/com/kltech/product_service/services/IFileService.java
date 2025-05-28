package com.kltech.product_service.services;

import jakarta.transaction.Transactional;
import java.io.IOException;
import org.springframework.web.multipart.MultipartFile;

public interface IFileService {

  @Transactional
  String upload(MultipartFile file) throws IOException;

  @Transactional
  byte[] download(String id);
}
