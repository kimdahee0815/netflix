package com.mysite.netflixProject.board;

import lombok.Data;

@Data
public class BoardVO {
	private int board_num;
	private String member_id;
	private String board_title;
	private String board_content;
	private String board_date;
	private String board_reply;
}
