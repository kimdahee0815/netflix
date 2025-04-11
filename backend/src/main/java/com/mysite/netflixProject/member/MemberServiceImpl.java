package com.mysite.netflixProject.member;

import org.springframework.stereotype.Service;

@Service
public class MemberServiceImpl implements MemberService {

	private MemberMapper mapper;
	
	public MemberServiceImpl(MemberMapper mapper) {
		this.mapper = mapper;
	}
	@Override
	public int login(MemberVO member) {
		int res = mapper.login(member);
		return res; // id와 pw가 일치하는 행수를 반환
	}

	@Override
	public int insertMember(MemberVO member) {
		int res = mapper.insertMember(member);
		return res; // 삽입한 행수를 반환
	}
	@Override
	public int passwordSearch(MemberVO member) {
		int res = mapper.passwordSearch(member);
		return res; 
	}
	
	@Override
	public int phoneUpdate(MemberVO member) {
		int res = mapper.phoneUpdate(member);
		return res; 
	}
	
	@Override
	public int emailUpdate(MemberVO member) {
		int res = mapper.emailUpdate(member);
		return res; 
	}
	
	@Override
	public int passwordUpdate(MemberVO member) {
		int res = mapper.passwordUpdate(member);
		return res; 
	}
	@Override
	public int idDuplicateCheck(MemberVO member) {
		int res = mapper.idDuplicateCheck(member);
		return res; 
	}
	@Override
	public MemberVO selectMember(MemberVO vo) {
		MemberVO member = mapper.selectMember(vo);
		return member;
	}
	@Override
	public int deleteMember(MemberVO member) {
		int res = mapper.deleteMember(member);
		return res; 
	}
	

}
