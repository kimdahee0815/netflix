package com.mysite.netflixProject.member;

import java.util.List;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

@Mapper
public interface MemberMapper {
	@Select("select count(*) from member where member_id = #{member_id} and member_pw = #{member_pw}")
	public int login(MemberVO member);
	
	@Insert("insert into member (member_id, member_pw, member_name, member_tel, member_addr, pw_question, pw_answer) "
			+ "values (#{member_id}, #{member_pw}, #{member_name}, #{member_tel}, #{member_addr}, #{pw_question}, #{pw_answer})")
	public int insertMember(MemberVO member);
	
	@Select("select count(*) from member where member_id = #{member_id} and pw_question = #{pw_question} and pw_answer = #{pw_answer}")
	public int passwordSearch(MemberVO member);
	
	@Update("update member set member_pw = #{member_pw} where member_id = #{member_id}")
	public int passwordUpdate(MemberVO vo);
	
	@Update("update member set member_id = #{member_new_id} where member_id = #{member_id}")
	public int emailUpdate(MemberVO vo);
	
	@Update("update member set member_tel = #{member_tel} where member_id = #{member_id}")
	public int phoneUpdate(MemberVO vo);
	
	@Select("SELECT count(*) FROM member WHERE member_id = #{member_id}")
	public int idDuplicateCheck(MemberVO vo);
	
	@Select("select * from member where member_id = #{member_id}")
	public MemberVO selectMember(String member_id);
	
	@Delete("delete from member where member_id = #{member_id}")
	public int deleteMember(MemberVO vo);
	
	@Select("select member_num, member_id, member_pw, member_name, member_tel, member_addr, pw_question, pw_answer, "
			+ "to_char(signup_date, 'YY/MM/DD') as signup_date from member order by member_num desc")
	public List<MemberVO> getMembers();
	
	@Update("update member set member_pw = #{member_pw}, member_name = #{member_name}, member_tel = #{member_tel},"
			+"member_addr = #{member_addr}, pw_question = #{pw_question}, pw_answer = #{pw_answer} where member_id = #{member_id}")
	public int updateMembers(MemberVO vo);

	@Select("SELECT member_num, member_id, member_pw, member_name, member_tel, member_addr, pw_question, pw_answer, "
			+ "to_char(signup_date, 'YY/MM/DD') as signup_date from member WHERE member_id LIKE CONCAT('%', #{search}, '%') OR member_name LIKE CONCAT('%', #{search}, '%') "
			+ "order by member_num desc")
	public List<MemberVO> searchMember(@Param("search") String search);
}