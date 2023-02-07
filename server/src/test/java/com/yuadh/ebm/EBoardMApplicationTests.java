package com.yuadh.ebm;

import com.yuadh.ebm.model.vo.HistoryCountVO;
import com.yuadh.ebm.service.HistoryService;
import com.yuadh.ebm.service.RoomService;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import javax.annotation.Resource;
import java.util.List;

@SpringBootTest
class EBoardMApplicationTests {

    @Resource
    RoomService roomService;
    @Resource
    HistoryService historyService;
    
    @Test
    void contextLoads() {
        List<HistoryCountVO> mouthData = historyService.getMouthData(2);
        System.out.println(mouthData.toString());
    }
    
    

}
