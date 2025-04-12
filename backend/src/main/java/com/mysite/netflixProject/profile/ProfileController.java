package com.mysite.netflixProject.profile;

import java.util.List;
import java.util.Map;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class ProfileController {

    private ProfileService profileService;

    public ProfileController(ProfileService profileService) {
        this.profileService = profileService;
    }

    @PostMapping("/profiles")
    public List<ProfileVO> getNicknames(@RequestBody ProfileVO vo) throws Exception {
        List<ProfileVO> profilelist = profileService.getNicknames(vo);
        return profilelist;
    }
    
    @PostMapping("/profileDetail")
    public ProfileVO getProfileDetail(@RequestBody ProfileVO vo) throws Exception {
        ProfileVO profileDetail = profileService.getProfileDetail(vo);
        return profileDetail;
    }
    
    @PostMapping("/profileEmailUpdate")
    public int profileEmailUpdate(@RequestBody ProfileVO vo) throws Exception {
        int res = profileService.profileEmailUpdate(vo);
        return res;
    }
    
    @PostMapping("/insertprofiles")
    public ResponseEntity<Void> insertNickname(@RequestBody Map<String, String> payload) {
        String member_id = payload.get("member_id");
        String nickname = payload.get("nickname");
        profileService.insertNickname(member_id, nickname);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PutMapping("/updateprofiles")
    public ResponseEntity<Void> updateNickname(@RequestBody ProfileVO vo) {
        int rowsAffected = profileService.updateNickname(vo.getMember_id(), vo.getProfile_id(), vo.getNickname());
        return rowsAffected > 0 ? 
            new ResponseEntity<>(HttpStatus.OK) : 
            new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/deleteprofiles")
    public ResponseEntity<Void> deleteNickname(@RequestParam String member_id, @RequestParam int profile_id) {
        int rowsAffected = profileService.deleteNickname(member_id, profile_id);
        return rowsAffected > 0 ? 
            new ResponseEntity<>(HttpStatus.NO_CONTENT) : 
            new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
    
    @DeleteMapping("/deleteProfileMember")
    public int deleteProfileMember(@RequestBody ProfileVO vo) {
        return profileService.deleteProfileMember(vo);
    }
}
