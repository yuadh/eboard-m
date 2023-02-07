package com.yuadh.ebm.controller;


import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.plugins.pagination.PageDTO;
import com.yuadh.ebm.annotation.AuthCheck;
import com.yuadh.ebm.common.BaseResponse;
import com.yuadh.ebm.common.DeleteRequest;
import com.yuadh.ebm.common.ErrorCode;
import com.yuadh.ebm.common.ResultUtils;
import com.yuadh.ebm.exception.BusinessException;
import com.yuadh.ebm.model.dto.room.RoomAddRequest;
import com.yuadh.ebm.model.dto.user.*;
import com.yuadh.ebm.model.entity.Room;
import com.yuadh.ebm.model.entity.User;
import com.yuadh.ebm.model.vo.InitVO;
import com.yuadh.ebm.model.vo.UserVO;
import com.yuadh.ebm.service.EquipmentService;
import com.yuadh.ebm.service.HistoryService;
import com.yuadh.ebm.service.RoomService;
import com.yuadh.ebm.service.UserService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.BeanUtils;

import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.stream.Collectors;

/**
 * @author yuadh 
 */
@RestController
@RequestMapping("/user")
public class UserController {
    
    @Resource
    private UserService userService;
    @Resource
    private EquipmentService equipmentService;
    @Resource
    private RoomService roomService;
    @Resource
    private HistoryService historyService;
    
    
    @GetMapping("/init")
    @AuthCheck(anyRole = {"admin","user","root"})
    public BaseResponse<InitVO> userInit(@RequestParam int id,HttpServletRequest request){
        if (id <= 0) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR,"用户不存在");
        }
        if (userService.getLoginUser(request)==null) {
            throw new BusinessException(ErrorCode.OPERATION_ERROR, "未登录");
        }
        if (userService.isAdmin(request)) {
            //如果是管理员拥有把所有数据初始化
            return ResultUtils.success(new InitVO(
                    userService.getUserCount(),
                    equipmentService.getEquipCountByAdminId(0),
                    roomService.getRoomCount(0),
                    historyService.getHistoryCountByAdminId(0),
                    historyService.getMouthData(0),
                    null)
            );
        }else {
            //如果是普通用户仅发送部分数据
            return ResultUtils.success(new InitVO(
                    userService.getUserCount(),
                    equipmentService.getEquipCountByAdminId(id),
                    roomService.getRoomCount(id),
                    historyService.getHistoryCountByAdminId(id),
                    historyService.getMouthData(id),
                    null)
            );
        }
    }
    
    
    // region 登录相关
    
    /**
     * 用户注册
     * @param userRegisterRequest - 用户注册请求dto
     * @return 用户id
     */
    @PostMapping("/register")
    public BaseResponse<Long> userRegister(@RequestBody UserRegisterRequest userRegisterRequest){
        if(userRegisterRequest==null){
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        String userAccount = userRegisterRequest.getUserAccount();
        String userPassword = userRegisterRequest.getUserPassword();
        String checkPassword = userRegisterRequest.getCheckPassword();
        if (StringUtils.isAnyBlank(userAccount,userPassword,checkPassword)) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        long result = userService.userRegister(userAccount, userPassword, checkPassword);
        return ResultUtils.success(result);
    }

    /**
     * 用户登录
     * @param userLoginRequest - 用户登入请求dto
     * @param request - request
     * @return - 用户信息
     */
    @PostMapping("/login")
    public BaseResponse<User> userLogin(@RequestBody UserLoginRequest userLoginRequest, HttpServletRequest request){
        if(userLoginRequest == null){
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        String userAccount = userLoginRequest.getUserAccount();
        String userPassword = userLoginRequest.getUserPassword();
        if (StringUtils.isAnyBlank(userAccount, userPassword)) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        User user = userService.userLogin(userAccount, userPassword, request);
        return ResultUtils.success(user);
    }

    /**
     * 用户注销
     * @param request - requst
     * @return -boolean
     */
    @PostMapping("/logout")
    public BaseResponse<Boolean> userLogout(HttpServletRequest request){
        if (request==null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        boolean result = userService.userLogout(request);
        return ResultUtils.success(result);
    }

    /**
     * 获取当前用户
     * @param request - request
     * @return - 用户视图信息
     */
    @GetMapping("/current")
    public BaseResponse<UserVO> getCurrentUser(HttpServletRequest request){
        User user = userService.getLoginUser(request);
        UserVO userVO = new UserVO();
        BeanUtils.copyProperties(user,userVO);
        return ResultUtils.success(userVO);
    }

    // endregion

    // region 增删改查
    
    /**
     * 添加用户
     * @param userAddRequest - 用户添加请求DTO
     * @return - 用户id
     */
    @AuthCheck(anyRole = {"admin","root"})
    @PostMapping("/create")
    public BaseResponse<Long> addUser(@RequestBody UserAddRequest userAddRequest){
        if (userAddRequest == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        User user = new User();
        
        BeanUtils.copyProperties(userAddRequest,user);
        long result = userService.userUpdata(user);
        if (result<0) {
            throw new BusinessException(ErrorCode.OPERATION_ERROR);
        }
        return ResultUtils.success(user.getId());
    }
    /**
     * 删除用户
     *
     * @param deleteRequest - 用户删除请求dto
     * @return - boolean
     */
    @AuthCheck(anyRole = {"admin","root"})
    @PostMapping("/delete")
    public BaseResponse<Boolean> deleteUser(@RequestBody DeleteRequest deleteRequest) {
        if (deleteRequest == null ||deleteRequest.getId()==null || deleteRequest.getId() <= 0) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        boolean b = userService.removeById(deleteRequest.getId());
        if (!b) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR,"用户不存在");
        }
        return ResultUtils.success(b);
    }

    /**
     * 更新用户
     *
     * @param userUpdateRequest - 用户更新请求dto
     * @return - 用户id
     */
    @AuthCheck(anyRole = {"admin","user","root"})
    @PostMapping("/update")
    public BaseResponse<Long> updateUser(@RequestBody UserUpdateRequest userUpdateRequest) {
        if (userUpdateRequest == null || userUpdateRequest.getId() == null||userUpdateRequest.getId()<0) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        User user = new User();
        BeanUtils.copyProperties(userUpdateRequest, user);
        long result = userService.userUpdata(user);
        return ResultUtils.success(result);
    }

    /**
     * 根据 id 获取用户
     *
     * @param id - 用户id
     * @return - 用户信息视图
     */
    @AuthCheck(anyRole = {"admin","user","root"})
    @GetMapping("/get")
    public BaseResponse<UserVO> getUserById(int id) {
        if (id <= 0) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        User user = userService.getById(id);
        if (user==null) {
            throw new BusinessException(ErrorCode.OPERATION_ERROR,"未查询到用户");
        }
        UserVO userVO = new UserVO();
        BeanUtils.copyProperties(user, userVO);
        return ResultUtils.success(userVO);
    }

    /**
     * 获取用户列表
     * @param userQueryRequest - 用户查询请求dto
     * @return - 用户视图列表
     */
    @AuthCheck(anyRole = {"admin","root"})
    @GetMapping("/list")
    public BaseResponse<List<UserVO>> listUser(UserQueryRequest userQueryRequest){
        User userQuery = new User();
        if (userQueryRequest!=null) {
            BeanUtils.copyProperties(userQueryRequest,userQuery);
        }
        QueryWrapper<User> qw = new QueryWrapper<>(userQuery);
        List<User> userList = userService.list(qw);
        List<UserVO> userVOList =  userList.stream().map(user->{
            UserVO userVO = new UserVO();
            BeanUtils.copyProperties(user,userVO);
            return userVO;
        }).collect(Collectors.toList());
        return ResultUtils.success(userVOList);
    }
    
    /**
     * 分页获取用户数据
     * @param userQueryRequest - 用户查询请求dto
     * @return - 分页用户视图列表
     */
    @AuthCheck(anyRole = {"admin","root"})
    @GetMapping("/list/page")
    public BaseResponse<Page<UserVO>> listUserByPage(UserQueryRequest userQueryRequest){
        long current = 1;
        long size = 10;
        User userQuery = new User();
        if (userQueryRequest != null) {
            BeanUtils.copyProperties(userQueryRequest,userQuery);
            current = userQueryRequest.getCurrent();
            size = userQueryRequest.getPageSize();
        }
        QueryWrapper<User> qw = new QueryWrapper<>(userQuery);
        Page<User> userPage = userService.page(new Page<>(current, size), qw);
        Page<UserVO> userVoPage = new PageDTO<>(userPage.getCurrent(), userPage.getSize(), userPage.getTotal());
        List<UserVO> userVOList = userPage.getRecords().stream().map(user->{
            UserVO userVO = new UserVO();
            BeanUtils.copyProperties(user,userVO);
            return userVO;
        }).collect(Collectors.toList());
        userVoPage.setRecords(userVOList);
        return ResultUtils.success(userVoPage);
    }
}
