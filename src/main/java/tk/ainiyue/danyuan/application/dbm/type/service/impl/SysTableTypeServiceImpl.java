package tk.ainiyue.danyuan.application.dbm.type.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import tk.ainiyue.danyuan.application.dbm.type.dao.SysTableTypeDao;
import tk.ainiyue.danyuan.application.dbm.type.po.SysTableTypeInfo;
import tk.ainiyue.danyuan.application.dbm.type.service.SysTableTypeService;

/**
 * 文件名 ： SysTableTypeServiceImpl.java
 * 包 名 ： tk.ainiyue.danyuan.application.dbm.type.service.impl
 * 描 述 ： TODO(用一句话描述该文件做什么)
 * 机能名称：
 * 技能ID ：
 * 作 者 ： wang
 * 时 间 ： 2017年8月3日 下午3:58:50
 * 版 本 ： V1.0
 */
@Service("sysTableTypeService")
public class SysTableTypeServiceImpl implements SysTableTypeService {
	//
	@Autowired
	private SysTableTypeDao sysTableTypeDao;
	
	@Override
	public List<SysTableTypeInfo> findAll() {
		return sysTableTypeDao.findAll();
	}
	
	@Override
	public void save(SysTableTypeInfo info) {
		sysTableTypeDao.save(info);
	}
}
