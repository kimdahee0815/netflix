package com.mysite.netflixProject.favmovie;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.mysite.netflixProject.board.Idchange;


@Service("favMovieService")
public class FavMovieServiceImpl implements FavMovieService {
	private FavMovieMapper mapper;
	
	public FavMovieServiceImpl(FavMovieMapper mapper) {
		this.mapper = mapper;
	}
	@Override
	public int insertFavMovie(FavMovieVO favmovieVO) {
		int res = mapper.insertFavMovie(favmovieVO);
		return res;
	}
	@Override
	public int deleteFavMovie(FavMovieVO favmovieVO) {
		int res = mapper.deleteFavMovie(favmovieVO);
		return res;
	}
	
	@Override
	public List<FavMovieVO> chkLike(FavMovieVO favmovieVO) {
		List<FavMovieVO> res = mapper.chkLike(favmovieVO);
		
		return res;
	}

	@Override
	public ArrayList<FavMovieVO> getFavMovielist(FavMovieVO favmovieVO) {
		ArrayList<FavMovieVO> favmovie_list= new ArrayList<FavMovieVO>();
		favmovie_list = mapper.getFavMovielist(favmovieVO);
		return favmovie_list;
	}
	@Override
	public int removeMember(FavMovieVO favmovieVO) {
		int res = mapper.removeMember(favmovieVO);
		return res;
	}
	@Override
	public int isDuplicateTitle(FavMovieVO favmovieVO) {
		int res = mapper.isDuplicateTitle(favmovieVO);
		return res;
	}
	
	@Override
	public int modifyID(Idchange change) {
		int res = mapper.modifyID(change);
		return res;
	}

}