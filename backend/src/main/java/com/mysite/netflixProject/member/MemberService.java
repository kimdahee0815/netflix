package com.mysite.netflixProject.member;


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
}
