package com.mysite.netflixProject.board;

import java.util.List;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/customer")
public class BoardController {
	
	public BoardController(BoardServiceImpl impl) {
		super();
		this.impl = impl;
	}

	private BoardServiceImpl impl;
	
	@RequestMapping("/get")
	public List<BoardVO> getBoardList() {
		List<BoardVO> vo = impl.getBoardList();
		return vo;
	}

	@RequestMapping("/insert")
	public int insertBoard(@RequestBody BoardVO board) {
		int res = impl.insertBoard(board);
		return res;
	}

	@RequestMapping("/detail")
	public BoardVO getDetail(BoardVO board) {
		BoardVO vo = impl.getDetail(board);
		return vo;
	}

	@RequestMapping("/modify")
	public int modifyBoard(@RequestBody BoardVO board) {
		int res = impl.modifyBoard(board);
		return res;
	}
	
	@RequestMapping("/modifyid")
	public int modifyID(@RequestBody Idchange change) {
		int res = impl.modifyID(change);
		return res;
	}

	@RequestMapping("/delete")
	public int deleteBoard(BoardVO board) {
		int res = impl.deleteBoard(board);
		return res;
	}
	
	@RequestMapping("/deletebyid")
	public int deleteId(@RequestBody BoardVO board) {
		int res = impl.deleteId(board);
		return res;
	}
	
	@RequestMapping("/reply")
	public int replyBoard(@RequestBody BoardVO board) {
		int res = impl.replyBoard(board);
		return res;
	}
	
	@RequestMapping("/search")
	public List<BoardVO> searchBoard(String search){
		List<BoardVO> vo = impl.searchBoard(search);
		  return vo;
	}

}
