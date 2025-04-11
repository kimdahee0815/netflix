package com.mysite.netflixProject.profile;

import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ProfileController {

    private ProfileService profileService;

    public ProfileController(ProfileService profileService) {
        this.profileService = profileService;
    }

    @RequestMapping("/profiles")
    public List<ProfileVO> getNicknames(@RequestBody ProfileVO vo) throws Exception {
        List<ProfileVO> profilelist = profileService.getNicknames(vo);
        return profilelist;
    }
    
    @RequestMapping("/profileDetail")
    public ProfileVO getProfileDetail(@RequestBody ProfileVO vo) throws Exception {
        ProfileVO profileDetail = profileService.getProfileDetail(vo);
        return profileDetail;
    }
    
    @RequestMapping("/profileEmailUpdate")
    public int profileEmailUpdate(@RequestBody ProfileVO vo) throws Exception{
    	int res = profileService.profileEmailUpdate(vo);
    	return res;
    }
    

    
    @RequestMapping("/insertprofiles")
    public ResponseEntity<Void> insertNickname(@RequestBody Map<String, String> payload) {
        String member_id = payload.get("member_id");
        String nickname = payload.get("nickname");
        profileService.insertNickname(member_id, nickname);
        ResponseEntity<Void> res = new ResponseEntity<>(HttpStatus.CREATED);
        return res;
    }

    @RequestMapping("/updateprofiles")
    public ResponseEntity<Void> updateNickname(@RequestBody ProfileVO vo) {
        int rowsAffected = profileService.updateNickname(vo.getMember_id(), vo.getProfile_id(), vo.getNickname());
        if (rowsAffected > 0) {
            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @RequestMapping("/deleteprofiles")
    public ResponseEntity<Void> deleteNickname(@RequestParam String member_id, @RequestParam int profile_id) {
        int rowsAffected = profileService.deleteNickname(member_id, profile_id);
        if (rowsAffected > 0) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    
    @RequestMapping("/deleteProfileMember")
    public int deleteProfileMember(@RequestBody ProfileVO vo) {
    	int res = profileService.deleteProfileMember(vo);
    	return res;
    }

}
