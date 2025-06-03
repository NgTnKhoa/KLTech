package com.kltech.product_service.services.impls;

import com.kltech.product_service.entities.File;
import com.kltech.product_service.repositories.FileRepository;
import com.kltech.product_service.services.IFileService;
import com.kltech.product_service.utils.FileUtils;
import java.io.IOException;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class FileService implements IFileService {

  private final FileRepository fileRepository;


  @Override
  public String upload(MultipartFile file) throws IOException {

    File imageData = fileRepository.save(File.builder()
        .name(file.getOriginalFilename())
        .type(file.getContentType())
        .data(FileUtils.compressFile(file.getBytes())).build());

    return imageData.getId();
  }


  @Override
  public byte[] download(String fileId) {
    Optional<File> file = fileRepository.findById((fileId));
    return FileUtils.decompressFile(file.get().getData());
  }
}
