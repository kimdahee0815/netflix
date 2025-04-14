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
@RequestMapping("/customer")
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

    @PostMapping("/modify")
    public int modifyBoard(@RequestBody BoardVO board) {
        return impl.modifyBoard(board);
    }
    
    @PostMapping("/modifyid")
    public int modifyID(@RequestBody Idchange change) {
        return impl.modifyID(change);
    }

    @GetMapping("/delete")
    public int deleteBoard(@RequestParam("board_num") int boardNum) {
        BoardVO boardVO = new BoardVO();
        boardVO.setBoard_num(boardNum);
        return impl.deleteBoard(boardVO);
    }
    
    @PostMapping("/deletebyid")
    public int deleteId(@RequestBody BoardVO board) {
        return impl.deleteId(board);
    }
    
    @PostMapping("/reply")
    public int replyBoard(@RequestBody BoardVO board) {
        return impl.replyBoard(board);
    }
    
    @GetMapping("/search")
    public List<BoardVO> searchBoard(@RequestParam String search) {
        return impl.searchBoard(search);
    }
}
