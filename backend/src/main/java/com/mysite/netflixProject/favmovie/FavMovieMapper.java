package com.mysite.netflixProject.favmovie;

import java.util.ArrayList;
import java.util.List;
import org.apache.ibatis.annotations.*;
import com.mysite.netflixProject.board.Idchange;

@Mapper
public interface FavMovieMapper {

	@Insert("insert into fav_movie (member_id, movie_title, movie_summary, movie_image) values (#{member_id}, #{movie_title}, #{movie_summary}, #{movie_image})")
	public int insertFavMovie(FavMovieVO favmovieVO);

	@Select("select movie_title from fav_movie where movie_title = #{movie_title} and member_id = #{member_id}")
	public List<FavMovieVO> chkLike(FavMovieVO favmovieVO);
	
	@Select("SELECT * FROM fav_movie WHERE member_id = #{member_id}")
	public List<FavMovieVO> getFavMovielist(@Param("member_id") String memberId);
	
	@Delete("delete from fav_movie where movie_title = #{movie_title} and member_id = #{member_id}")
	public int deleteFavMovie(FavMovieVO favmovieVO);
	
	@Delete("delete from fav_movie where member_id = #{member_id}")
	public int removeMember(FavMovieVO favmovieVO);
	
	@Select("select count(*) from fav_movie where member_id = #{member_id} and movie_title = #{movie_title}")
	public int isDuplicateTitle(FavMovieVO favmovieVO);
	
	@Update("update fav_movie set member_id = #{new_member_id} where member_id = #{old_member_id}")
	public int modifyID(Idchange change);

}