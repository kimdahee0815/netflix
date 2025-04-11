package com.mysite.netflixProject.member;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mysite.netflixProject.board.BoardVO;


@RestController
public class MemberController {
	private MemberService memberService;
	
	public MemberController(MemberService memberService) {
		this.memberService = memberService;
	}
	
	@RequestMapping("/login")
	public int login(@RequestBody MemberVO vo) throws Exception{
		int res = memberService.login(vo);
//		System.out.println("res : "+res);
		
		return res;
	}

	
	@RequestMapping("/insertMember")
	public int insertmember(@RequestBody MemberVO vo) throws Exception{
		int res = memberService.insertMember(vo);
		
		return res;
	}
	
	@RequestMapping("/passwordSearch")
	public int passwordSearch(@RequestBody MemberVO vo) throws Exception{
		int res = memberService.passwordSearch(vo);
		
		return res;
	}
	
	@RequestMapping("/passwordUpdate")
	public int passwordUpdate(@RequestBody MemberVO vo) throws Exception{
		int res = memberService.passwordUpdate(vo);
		System.out.println("res : "+res);
		return res;
	}
	
	
	@RequestMapping("/phoneUpdate")
	public int phoneUpdate(@RequestBody MemberVO vo) throws Exception{
		int res = memberService.phoneUpdate(vo);
//		System.out.println("res : "+res);
		return res;
	}
	
	@RequestMapping("/emailUpdate")
	public int emailUpdate(@RequestBody MemberVO vo) throws Exception{
		int res = memberService.emailUpdate(vo);
//		System.out.println("res : "+res);
		return res;
	}
	
	@RequestMapping("/selectMember")
	public MemberVO selectMember(@RequestBody MemberVO vo) throws Exception{
		MemberVO selectedMember = memberService.selectMember(vo);
		
		return selectedMember;
	}
	@RequestMapping("/idDuplicateCheck")
	public int idDuplicateCheck(@RequestBody MemberVO vo) throws Exception{
		int res = memberService.idDuplicateCheck(vo);
//		System.out.println("res : "+res);
		return res;
	}
	
	@RequestMapping("/deleteMember")
	public int deleteMember(@RequestBody MemberVO vo) throws Exception{
		int res = memberService.deleteMember(vo);
//		System.out.println("res : "+res);
		return res;
	}
	
	@RequestMapping("/getMembers")
	public List<MemberVO> getMembers(@RequestBody MemberVO vo) throws Exception{
		List<MemberVO> memberList = memberService.getMembers();
		return memberList;
	}
	
	@RequestMapping("/updateMembers")
	public ResponseEntity<Void> updateMembers(@RequestBody MemberVO vo) throws Exception{
		int rowsAffected = memberService.updateMembers(vo);
		
		 if (rowsAffected > 0) {
	            return new ResponseEntity<>(HttpStatus.OK);
	        } else {
	            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	        }

	}
	
	@RequestMapping("/memberSearch")
	public List<MemberVO> searchMember(String search){
		List<MemberVO> vo = memberService.searchMember(search);
		  return vo;
	}


	
}
