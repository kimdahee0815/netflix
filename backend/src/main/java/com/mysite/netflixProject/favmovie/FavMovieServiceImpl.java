package com.mysite.netflixProject.favmovie;

import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.mysite.netflixProject.board.Idchange;

@Service
@Transactional
public class FavMovieServiceImpl implements FavMovieService {
    private final FavMovieMapper mapper;
    
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
    public List<FavMovieVO> getFavMovielist(String memberId) {
          // Add logging
        List<FavMovieVO> favmovie_list = mapper.getFavMovielist(memberId);
        
        return favmovie_list;
    }

    public List<FavMovieVO> getAllFavMovieCount() {
        List<FavMovieVO> favmovie_list = mapper.getAllFavMovieCount();
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