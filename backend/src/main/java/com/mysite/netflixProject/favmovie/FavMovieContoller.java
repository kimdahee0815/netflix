package com.mysite.netflixProject.favmovie;

import java.util.ArrayList;
import java.util.List;

import org.apache.ibatis.annotations.Param;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.mysite.netflixProject.board.BoardVO;
import com.mysite.netflixProject.board.Idchange;


@RestController
@RequestMapping("/favmovie")
public class FavMovieContoller {
	private FavMovieService favMovieService; 
	
	public FavMovieContoller(FavMovieService favMovieService) { 
		this.favMovieService = favMovieService;
	}
	
	@RequestMapping("/insert")
	public int insertFavMovie(@RequestBody FavMovieVO favmovieVO) throws Exception{
		int res = favMovieService.insertFavMovie(favmovieVO);
		return res;
	}
	@RequestMapping("/delete")
	public int deleteFavMovie(@RequestBody FavMovieVO favmovieVO) throws Exception{
		int res = favMovieService.deleteFavMovie(favmovieVO);
		return res;
	}
	
	@RequestMapping("/remove")
	public int removeMember(@RequestBody FavMovieVO favmovieVO) throws Exception{
		int res = favMovieService.removeMember(favmovieVO);
		return res;
	}
	
	@RequestMapping("/chk")
	public List<FavMovieVO> chkLike(@RequestBody FavMovieVO favmovieVO) {
		List<FavMovieVO> res = favMovieService.chkLike(favmovieVO);
		
		return res;
	}
	
	@RequestMapping("/select")
	public ArrayList<FavMovieVO> getFavMovielist(@RequestBody FavMovieVO favmovieVO) {
		ArrayList<FavMovieVO> favmovie_list= new ArrayList<FavMovieVO>();
		favmovie_list = favMovieService.getFavMovielist(favmovieVO);
		return favmovie_list;
	}
	
	@RequestMapping("/isDuplicateTitle")
	public int isDuplicateTitle(@RequestBody FavMovieVO favmovieVO) {
		int res = favMovieService.isDuplicateTitle(favmovieVO);
		
		return res;
	}
	
	@RequestMapping("/modifyid")
	public int modifyID(@RequestBody Idchange change) {
		int res = favMovieService.modifyID(change);
		return res;
	}

}
