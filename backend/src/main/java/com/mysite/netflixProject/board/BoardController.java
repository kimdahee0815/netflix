package com.mysite.netflixProject.board;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/customer")
public class BoardController {
    private BoardServiceImpl impl;
    
    public BoardController(BoardServiceImpl impl) {
        this.impl = impl;
    }
    
    @GetMapping("/get")
    public List<BoardVO> getBoardList() {
        return impl.getBoardList();
    }

    @PostMapping("/insert")
    public int insertBoard(@RequestBody BoardVO board) {
        return impl.insertBoard(board);
    }

    @GetMapping("/detail")
    public BoardVO getDetail(BoardVO board) {
        return impl.getDetail(board);
    }

    @PutMapping("/modify")
    public int modifyBoard(@RequestBody BoardVO board) {
        return impl.modifyBoard(board);
    }
    
    @PutMapping("/modifyid")
    public int modifyID(@RequestBody Idchange change) {
        return impl.modifyID(change);
    }

    @DeleteMapping("/delete")
    public int deleteBoard(@RequestBody BoardVO board) {
        return impl.deleteBoard(board);
    }
    
    @DeleteMapping("/deletebyid")
    public int deleteId(@RequestBody BoardVO board) {
        return impl.deleteId(board);
    }
    
    @PutMapping("/reply")
    public int replyBoard(@RequestBody BoardVO board) {
        return impl.replyBoard(board);
    }
    
    @GetMapping("/search")
    public List<BoardVO> searchBoard(@RequestParam String search) {
        return impl.searchBoard(search);
    }
}
