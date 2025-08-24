package com.mysite.netflixProject.favmovie;

import java.util.ArrayList;
import java.util.List;
import org.springframework.web.bind.annotation.*;
import com.mysite.netflixProject.board.Idchange;

@RestController
@RequestMapping("/favmovie")
public class FavMovieContoller {
    private FavMovieService favMovieService; 
    
    public FavMovieContoller(FavMovieService favMovieService) { 
        this.favMovieService = favMovieService;
    }
    
    @PostMapping("/insert")
    public int insertFavMovie(@RequestBody FavMovieVO favmovieVO) throws Exception {
        return favMovieService.insertFavMovie(favmovieVO);
    }

    @PostMapping("/delete")
    public int deleteFavMovie(@RequestBody FavMovieVO favmovieVO) throws Exception {
        return favMovieService.deleteFavMovie(favmovieVO);
    }
    
    @PostMapping("/remove")
    public int removeMember(@RequestBody FavMovieVO favmovieVO) throws Exception {
        return favMovieService.removeMember(favmovieVO);
    }

    @GetMapping("/chk")
    public List<FavMovieVO> getAllFavMovieCount() {
        return favMovieService.getAllFavMovieList();
    }
    
    @PostMapping("/chk")
    public List<FavMovieVO> chkLike(@RequestBody FavMovieVO favmovieVO) {
        return favMovieService.chkLike(favmovieVO);
    }
    
    @PostMapping("/select")
    public List<FavMovieVO> getFavMovielist(@RequestBody FavMovieVO favmovieVO) {
        System.out.println("Member ID: " + favmovieVO.getMember_id());
        List<FavMovieVO> result = favMovieService.getFavMovielist(favmovieVO);
        System.out.println("Result size: " + result.size());
        return favMovieService.getFavMovielist(favmovieVO);
    }
    
    @PostMapping("/isDuplicateTitle")
    public int isDuplicateTitle(@RequestBody FavMovieVO favmovieVO) {
        return favMovieService.isDuplicateTitle(favmovieVO);
    }
    
    @PostMapping("/modifyid")
    public int modifyID(@RequestBody Idchange change) {
        return favMovieService.modifyID(change);
    }
}
