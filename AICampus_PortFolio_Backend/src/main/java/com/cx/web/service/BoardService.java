package com.cx.web.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.cx.web.entity.Board;
import com.cx.web.repository.BoardRepository;

import java.io.File;
import java.io.IOException;
import java.util.Date;
import java.util.UUID;

@RequiredArgsConstructor
@Service
public class BoardService {
	
    private final BoardRepository repository;
	
    public void writeProcess(Board board, MultipartFile file) throws IllegalStateException, IOException {
        
        // 1. 첨부 파일이 없는 경우
        if(file == null || file.isEmpty()) { 
            // 프론트엔드에서 "post.image || 기본이미지" 문법을 쓰기 위해 
            // "none" 보다는 null 로 비워두는 것이 리액트에서 처리하기 훨씬 좋다.
            board.setImage(null); 
        } 
        // 2. 첨부 파일이 있는 경우
        else { 
            String originalFileName = file.getOriginalFilename(); 
            
            // 저장 경로 지정
            String uploadDir = "C:/upload/";
            
            // C드라이브에 upload 폴더가 실수로 지워져 있어도 에러가 나지 않도록 자동 생성
            File folder = new File(uploadDir);
            if (!folder.exists()) {
                folder.mkdirs(); 
            }
            
            // UUID 생성 및 파일명 조합
            String uuid = UUID.randomUUID().toString();
            String savedName = uuid + "_" + originalFileName;
            
            // 물리적 파일 저장
            File savedFile = new File(uploadDir, savedName);
            file.transferTo(savedFile); 
       
            
            // 리액트 <img src="..." /> 태그에서 읽기위해 
            //  "/upload/"  웹 주소 경로 붙여서 DB 저장.
            board.setImage("/upload/" + savedName);
        }
        
        // 작성일자 세팅 (DB에 기본값이 안 들어갈 경우를 대비한 안전장치)
        if(board.getIndate() == null) {
            board.setIndate(new Date());
        }
        repository.save(board);
    }
}