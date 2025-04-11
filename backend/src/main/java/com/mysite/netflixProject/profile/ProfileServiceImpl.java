package com.mysite.netflixProject.profile;

import java.util.List;

import org.springframework.stereotype.Service;

@Service("profileService")
public class ProfileServiceImpl implements ProfileService {

	private ProfileMapper mapper;

    public ProfileServiceImpl(ProfileMapper mapper) {
        this.mapper = mapper;
    }
	
	@Override
	public List<ProfileVO> getNicknames(ProfileVO vo) {
		List<ProfileVO> profilelist = mapper.getNicknames(vo);
		return profilelist;
	}
	
	@Override
	public ProfileVO getProfileDetail(ProfileVO vo) {
		ProfileVO profile = mapper.getProfileDetail(vo);
		return profile;
	}
	
	@Override
	public int profileEmailUpdate(ProfileVO vo) {
		int res = mapper.profileEmailUpdate(vo);
		return res;
	}
	@Override
	public void insertNickname(String member_id, String nickname) {
	    int profileId = mapper.getNextProfileId(member_id);
	    
		
	    if (profileId > 4) {   
	        throw new IllegalStateException("최대 4개까지 등록가능");
	    }
	    mapper.insertNickname(member_id, 1, nickname);
	    mapper.counterset();
		mapper.counterset2(member_id);
	}

	@Override
	public int updateNickname(String member_id, int profile_id, String nickname) {
	    int res = mapper.updateNickname(member_id, profile_id, nickname);
		return res;
	}

	@Override
	public int deleteNickname(String member_id, int profile_id) {
	    int res = mapper.deleteNickname(member_id, profile_id);
	    mapper.counterset();
	    mapper.counterset2(member_id);
		return res;
	}

	@Override
	public int deleteProfileMember(ProfileVO vo) {
		int res = mapper.deleteProfileMember(vo);
		return res;
	}

	

	


}
