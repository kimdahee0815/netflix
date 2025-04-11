package com.mysite.netflixProject.member;

import java.util.List;

import com.mysite.netflixProject.board.BoardVO;

public interface MemberService {
	public int login(MemberVO member);
	public int insertMember(MemberVO member);
	public int passwordSearch(MemberVO member);
	public int passwordUpdate(MemberVO vo);
	public int phoneUpdate(MemberVO vo);
	public int emailUpdate(MemberVO vo);
	public MemberVO selectMember(MemberVO vo);
	public int idDuplicateCheck(MemberVO vo);
	public int deleteMember(MemberVO vo);
	public List<MemberVO> getMembers();
	public int updateMembers(MemberVO vo);
	public List<MemberVO> searchMember(String search);
}
