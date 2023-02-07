package com.yuadh.ebm.controller;

import com.yuadh.ebm.annotation.AuthCheck;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;


@RestController
public class ImageController {
    //这部分功能忽略，建议使用图床。。
//    @AuthCheck(anyRole = {"admin","user","root"})
    @RequestMapping(value = "/upload/uploadPic", method = {RequestMethod.POST, RequestMethod.GET})
    public String uploadPicture(HttpServletRequest request) throws IOException {


        request.setCharacterEncoding("utf-8"); //设置编码

        MultipartHttpServletRequest req = (MultipartHttpServletRequest) request;

        //对应前端的upload的name参数"image"
        MultipartFile multipartFile = req.getFile("image");

        //realPath填写电脑文件夹所在路径
        String realPath = "/www/wwwroot/demo.yuadh.com/EBM_PUB";

        //String realPath = request.getSession().getServletContext().getRealPath("/upLoadImg/");

        //格式化时间戳
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd-HH-mm-ss");

        String nowTime = sdf.format(System.currentTimeMillis());

        //裁剪用户id
        String originalFirstName = multipartFile.getOriginalFilename();
        String picFirstName = originalFirstName.substring(0, originalFirstName.indexOf("."));

        //取得图片的格式后缀
        String originalLastName = multipartFile.getOriginalFilename();
        String picLastName = originalLastName.substring(originalLastName.lastIndexOf("."));

        //拼接：名字+时间戳+后缀
        String picName = nowTime+"."+ picFirstName + picLastName;

        //图片上传成功之后的路径
        String imgPath;

        try {
            File dir = new File(realPath);
            //如果文件目录不存在，创建文件目录
            if (!dir.exists()) {
                dir.mkdir();
                System.out.println("创建文件目录成功：" + realPath);
            }
            File file = new File(realPath, picName);
            multipartFile.transferTo(file);

            System.out.println("添加图片成功！");
            // 换成你自己的服务器地址
            imgPath = "http://demo.yuadh.com/EBM_PUB/" + picName;
            System.out.println(imgPath);
        } catch (IOException e) {
            e.printStackTrace();
            imgPath = " ";

        } catch (IllegalStateException e) {
            e.printStackTrace();
            imgPath = " ";
        }
        return imgPath;
    }
}
