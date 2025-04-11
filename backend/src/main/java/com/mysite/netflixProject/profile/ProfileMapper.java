package com.mysite.netflixProject.profile;

import java.util.List;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;
import org.springframework.web.bind.annotation.RequestBody;

@Mapper
public interface ProfileMapper {

	@Select("SELECT member_id, profile_id, nickname FROM profile WHERE member_id = #{member_id}")
    public List<ProfileVO> getNicknames(ProfileVO vo);
	
	@Select("SELECT member_id, profile_id, nickname FROM profile WHERE member_id = #{member_id} and profile_id=#{profile_id}")
	public ProfileVO getProfileDetail(ProfileVO vo);
	
	@Update("UPDATE profile set member_id=#{member_new_id} where member_id=#{member_id}")
	public int profileEmailUpdate(ProfileVO vo);
	
	@Insert("INSERT INTO profile (member_id, profile_id, nickname) VALUES (#{member_id}, 1, #{nickname})")
    public int insertNickname(@Param("member_id") String member_id, @Param("profile_id") int profile_id, @Param("nickname") String nickname);
	
	@Select("SELECT IFNULL(MAX(profile_id), 0) + 1 FROM profile WHERE member_id = #{member_id}")
	int getNextProfileId(@Param("member_id") String member_id);

	@Update("UPDATE profile SET nickname = #{nickname} WHERE member_id = #{member_id} AND profile_id = #{profile_id}")
	public int updateNickname(@Param("member_id") String member_id, @Param("profile_id") int profile_id, @Param("nickname") String nickname);

	@Delete("DELETE FROM profile WHERE member_id = #{member_id} AND profile_id = #{profile_id}")
	public int deleteNickname(@Param("member_id") String member_id, @Param("profile_id") int profile_id);

	@Update("set @cnt=0;")
	public void counterset();
	
	@Update("update profile"
			+ " set profile_id = (@cnt := @cnt + 1)"
			+ " where member_id=#{member_id}"
			+ " order by profile_date asc;")
	public void counterset2(@Param("member_id")String member_id);
	
	@Delete("DELETE FROM profile where member_id=#{member_id}")
	public int deleteProfileMember(ProfileVO vo);
}
