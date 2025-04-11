package com.mysite.netflixProject.member;

import lombok.Data;

@Data
public class MemberVO {
	private int member_num;
	private String member_id;
	private String member_new_id;
	private String member_pw;
	private String member_name;
	private String member_tel;
	private String member_addr;
	private String pw_question;
	private String pw_answer;
}
