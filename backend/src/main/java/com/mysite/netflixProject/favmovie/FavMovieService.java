
package com.mysite.netflixProject.favmovie;

import java.util.ArrayList;
import java.util.List;

import com.mysite.netflixProject.board.Idchange;



public interface FavMovieService {
	public int insertFavMovie(FavMovieVO favmovieVO);
	
	public ArrayList<FavMovieVO> getFavMovielist(FavMovieVO favmovieVO);
	
	public int deleteFavMovie(FavMovieVO favmovieVO);
	
	public int removeMember(FavMovieVO favmovieVO);
	
	public List<FavMovieVO> chkLike(FavMovieVO favmovieVO);
	
	public int isDuplicateTitle(FavMovieVO favmovieVO);
	
	public int modifyID(Idchange change);
}