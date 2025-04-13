package com.mysite.netflixProject.member;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MemberController {
    private MemberService memberService;
    
    public MemberController(MemberService memberService) {
        this.memberService = memberService;
    }
    
    @PostMapping("/login")  
    public int login(@RequestBody MemberVO vo) throws Exception {
        return memberService.login(vo);
    }
    
    @PostMapping("/insertMember") 
    public int insertmember(@RequestBody MemberVO vo) throws Exception {
        return memberService.insertMember(vo);
    }
    
    @PostMapping("/passwordSearch")  
    public int passwordSearch(@RequestBody MemberVO vo) throws Exception {
        return memberService.passwordSearch(vo);
    }
    
    @PostMapping("/passwordUpdate")  
    public int passwordUpdate(@RequestBody MemberVO vo) throws Exception {
        return memberService.passwordUpdate(vo);
    }
    
    @PostMapping("/phoneUpdate")  
    public int phoneUpdate(@RequestBody MemberVO vo) throws Exception {
        return memberService.phoneUpdate(vo);
    }
    
    @PostMapping("/emailUpdate")  
    public int emailUpdate(@RequestBody MemberVO vo) throws Exception {
        return memberService.emailUpdate(vo);
    }
    
    @PostMapping("/selectMember")  
    public MemberVO selectMember(@RequestBody MemberVO vo) throws Exception {
        return memberService.selectMember(vo);
    }
    
    @PostMapping("/idDuplicateCheck")  
    public int idDuplicateCheck(@RequestBody MemberVO vo) throws Exception {
        return memberService.idDuplicateCheck(vo);
    }
    
    @PostMapping("/deleteMember")  
    public int deleteMember(@RequestBody MemberVO vo) throws Exception {
        return memberService.deleteMember(vo);
    }
    
    @PostMapping("/getMembers")  
    public List<MemberVO> getMembers(@RequestBody MemberVO vo) throws Exception {
        return memberService.getMembers();
    }
    
    @PostMapping("/updateMembers")  
    public ResponseEntity<Void> updateMembers(@RequestBody MemberVO vo) throws Exception {
        int rowsAffected = memberService.updateMembers(vo);
        return rowsAffected > 0 ? 
            new ResponseEntity<>(HttpStatus.OK) : 
            new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
    
    @GetMapping("/memberSearch")  
    public List<MemberVO> searchMember(String search) {
        return memberService.searchMember(search);
    }
}
