package com.mysite.netflixProject.profile;

import java.util.List;

import org.springframework.web.bind.annotation.RequestBody;

public interface ProfileService {
    public List<ProfileVO> getNicknames(ProfileVO vo);
    public ProfileVO getProfileDetail(ProfileVO vo);
    public int profileEmailUpdate(ProfileVO vo);
    void insertNickname(String member_id, String nickname);
    int updateNickname(String member_id, int profile_id, String nickname);
    int deleteNickname(String member_id, int profile_id);
    public int deleteProfileMember(ProfileVO vo);

}
