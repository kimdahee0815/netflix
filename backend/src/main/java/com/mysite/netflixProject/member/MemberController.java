package com.mysite.netflixProject.member;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


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
	
	
}
