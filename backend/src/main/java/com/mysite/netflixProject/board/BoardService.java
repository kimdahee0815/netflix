package com.mysite.netflixProject.board;

import java.util.List;

public interface BoardService {
	public List<BoardVO> getBoardList();
	public int insertBoard(BoardVO board);
	public BoardVO getDetail(BoardVO board);
	public int modifyBoard(BoardVO board);
	public int modifyID(Idchange change);
	public int deleteBoard(BoardVO board);
	public int replyBoard(BoardVO board);
	public int deleteId(BoardVO board);
	public List<BoardVO> searchBoard(String search);
}
