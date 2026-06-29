package com.mysite.netflixProject.member;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
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
    
    @GetMapping("/selectMember")  
    public MemberVO selectMember(@RequestParam String member_id) throws Exception {
        return memberService.selectMember(member_id);
    }
    
    @PostMapping("/idDuplicateCheck")  
    public int idDuplicateCheck(@RequestBody MemberVO vo) throws Exception {
        return memberService.idDuplicateCheck(vo);
    }
    
    @PostMapping("/deleteMember")  
    public int deleteMember(@RequestBody MemberVO vo) throws Exception {
        return memberService.deleteMember(vo);
    }
    
    @GetMapping("/getMembers")  
    public List<MemberVO> getMembers() throws Exception {
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
    public List<MemberVO> searchMember(@RequestParam String search) {
        return memberService.searchMember(search);
    }
}
