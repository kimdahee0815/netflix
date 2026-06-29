package com.mysite.netflixProject.member;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class MemberServiceImpl implements MemberService {
	private MemberMapper mapper;

	public MemberServiceImpl(MemberMapper mapper) {
		this.mapper = mapper;
	}

	@Override
	public int login(MemberVO member) {
		return mapper.login(member);
	}

	@Override
	public int insertMember(MemberVO member) {
		return mapper.insertMember(member);
	}

	@Override
	public int passwordSearch(MemberVO member) {
		return mapper.passwordSearch(member);
	}

	@Override
	public int phoneUpdate(MemberVO member) {
		return mapper.phoneUpdate(member);
	}

	@Override
	public int emailUpdate(MemberVO member) {
		return mapper.emailUpdate(member);
	}

	@Override
	public int passwordUpdate(MemberVO member) {
		return mapper.passwordUpdate(member);
	}

	@Override
	public int idDuplicateCheck(MemberVO vo) {
		return mapper.idDuplicateCheck(vo);
	}

	@Override
	public MemberVO selectMember(String member_id) {
		return mapper.selectMember(member_id);
	}

	@Override
	public int deleteMember(MemberVO member) {
		return mapper.deleteMember(member);
	}

	@Override
	public List<MemberVO> getMembers() {
		return mapper.getMembers();
	}

	@Override
	public int updateMembers(MemberVO member) {
		return mapper.updateMembers(member);
	}

	@Override
	public List<MemberVO> searchMember(String search) {
		return mapper.searchMember(search);
	}
}