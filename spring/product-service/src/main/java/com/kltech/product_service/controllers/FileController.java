package com.kltech.product_service.controllers;

import com.kltech.product_service.models.responses.BaseResponse;
import com.kltech.product_service.services.IFileService;
import java.io.IOException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/v1/files")
@RequiredArgsConstructor
public class FileController {

  private final IFileService fileService;

  @PostMapping
  public ResponseEntity<?> upload(
      @RequestParam("file") MultipartFile file
  ) throws IOException {
    String mess = fileService.upload(file);
    return ResponseEntity.status(HttpStatus.OK)
        .body(mess);
  }

  @GetMapping("/{id}")
  public ResponseEntity<?> download(@PathVariable String id) {
    byte[] file = fileService.download(id);
    return ResponseEntity.status(HttpStatus.OK)
        .contentType(MediaType.valueOf("image/png"))
        .body(file);
  }
}
