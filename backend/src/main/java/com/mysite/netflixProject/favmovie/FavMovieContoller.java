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

    @DeleteMapping("/delete")
    public int deleteFavMovie(@RequestBody FavMovieVO favmovieVO) throws Exception {
        return favMovieService.deleteFavMovie(favmovieVO);
    }
    
    @DeleteMapping("/remove")
    public int removeMember(@RequestBody FavMovieVO favmovieVO) throws Exception {
        return favMovieService.removeMember(favmovieVO);
    }
    
    @GetMapping("/chk")
    public List<FavMovieVO> chkLike(@RequestBody FavMovieVO favmovieVO) {
        return favMovieService.chkLike(favmovieVO);
    }
    
    @GetMapping("/select")
    public ArrayList<FavMovieVO> getFavMovielist(@RequestBody FavMovieVO favmovieVO) {
        return favMovieService.getFavMovielist(favmovieVO);
    }
    
    @GetMapping("/isDuplicateTitle")
    public int isDuplicateTitle(@RequestBody FavMovieVO favmovieVO) {
        return favMovieService.isDuplicateTitle(favmovieVO);
    }
    
    @PutMapping("/modifyid")
    public int modifyID(@RequestBody Idchange change) {
        return favMovieService.modifyID(change);
    }
}
