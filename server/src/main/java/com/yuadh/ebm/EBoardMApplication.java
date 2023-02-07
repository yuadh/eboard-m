package com.yuadh.ebm;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

/**
 * @author yuadh 
 */
@SpringBootApplication
@MapperScan("com.yuadh.ebm.mapper")
public class EBoardMApplication {

    public static void main(String[] args) {
        SpringApplication.run(EBoardMApplication.class, args);
    }

}
