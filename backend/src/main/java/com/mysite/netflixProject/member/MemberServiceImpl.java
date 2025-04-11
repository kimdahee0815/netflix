package com.mysite.netflixProject.member;

import java.util.List;

import org.springframework.stereotype.Service;

import com.mysite.netflixProject.board.BoardVO;

@Service
public class MemberServiceImpl implements MemberService {

	private MemberMapper mapper;
	
	public MemberServiceImpl(MemberMapper mapper) {
		this.mapper = mapper;
	}
	@Override
	public int login(MemberVO member) {
		int res = mapper.login(member);
		return res; 
	}

	@Override
	public int insertMember(MemberVO member) {
		int res = mapper.insertMember(member);
		mapper.counterset();
		mapper.counterset2();

		return res; 

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
		mapper.counterset();
		mapper.counterset2();
		return res; 
	}
	
	public List<MemberVO> getMembers(){
		List<MemberVO> memberList = mapper.getMembers();
		return memberList;
	}
	@Override
	public int updateMembers(MemberVO member) {
		int res = mapper.updateMembers(member);
		return res; 
	}
	@Override
	public List<MemberVO> searchMember(String search) {
		List<MemberVO> vo = mapper.searchMember(search);
		  return vo;
	}
	

}
