$('#add_table_addrName').select2({
    placeholder: "数据库名称",
    allowClear: true,
    tags: true,
});

$('#add_table_typeName').select2({
    placeholder: "类型名",
    allowClear: true,
    tags: true,
});

$(function() {
	// 新建表
	$('#db_create_table_button').click(function() {
		//		alert("Something will happen!");
		var tableName= $("#add_table_tableName").val();
		var tableDesc=$("#add_table_tableDesc").val();
		var databaseUuid=$("#add_table_addrName").val();
		var typeUuid=$("#add_table_typeName").val();
		var param = {
				uuid:getUuid(),
				tableName:tableName,
				tableDesc:tableDesc,
				databaseUuid:databaseUuid,
				typeUuid:typeUuid
			};
			// 重载
			var url = "/sysTableInfo/saveSysTableInfo";
			ajaxPost(url, param, successSaveSysTableInfo, 1000, findError);
	});
	// 新建表
//	$('#db_trash_table_button').click(function() {
//		// TODO 清空表
//		bootbox.setLocale("zh_CN");
//		bootbox.confirm({
//		message : "确定要清空所有数据",
//		title : "系统提示",
//		callback : function(result) {
//				if (result) {
//					var param = {
//						uuid:
//					};
//					// 重载
//					var url = "/sysDatabaseInfo/deleteSysDatabaseInfo";
//					ajaxPost(url, param, successDeleteSysTableInfo, 1000, findError);
//				}
//			}
//		});
//		
//	});
	//新加字段
	$('#addnew_column').click(function() {
		loadPage('/pages/dbm/table/add_column.html','add_column_tab_id','新加字段');
	});
	// 编辑字段
	$('#editold_column').click(function() {
		var data = $('#db_addr_datagrid').bootstrapTable('getAllSelections');
		if(data.length == 0){
			alert("先选中一条数据");
		}else if(data.length > 1){
			alert("只能选择一条");
		}else{
			loadPage('/sysDatabaseInfo/addBefor','add_addr_id','修改连接',data[0],'reload')
			
		}
	});
	// 删除字段
	$('#deleteold_column').click(function() {
		var data = $('#db_table_datagrid').bootstrapTable('getAllSelections');
		if(data.length == 0){
			alert("先选中一条数据");
		}else if(data.length > 0){
			bootbox.setLocale("zh_CN");
			bootbox.confirm({
			message : "确定要删除选定行",
			title : "系统提示",
			callback : function(result) {
					if (result) {
						var param = {
								"list":data,
						};
						// 重载
						var url = "/sysTableInfo/deleteSysTableInfo";
						ajaxPost(url, param, successDeleteSysTableInfo, 1000, findError);
					}
				}
			});
		}
	});

	// bootstrap table 表列表
	$('#db_colum_datagrid').bootstrapTable({
		url : "/sysTableInfo/findAll",
		dataType : "json",
		toolbar : '#db_column_toolbar', // 工具按钮用哪个容器
		cache : true, // 是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
		sortable : true, // 是否启用排序
		sortOrder : "asc", // 排序方式
		pagination : true, // 分页
		pageNumber : 1, // 初始化加载第一页，默认第一页
		pageSize : 10, // 每页的记录行数（*）
		pageList : [ 10, 25, 50, 100 ], // 可供选择的每页的行数（*）
		strictSearch : true,
		showColumns : true, // 是否显示所有的列
		showRefresh : true, // 是否显示刷新按钮
		minimumCountColumns : 2, // 最少允许的列数
		clickToSelect : true, // 是否启用点击选中行
		height : 500, // 行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
		uniqueId : "uuid", // 每一行的唯一标识，一般为主键列
		showToggle : true, // 是否显示详细视图和列表视图的切换按钮
		cardView : false, // 是否显示详细视图
		detailView : false, // 是否显示父子表
		singleSelect : false,
		locales : "zh-CN", // 表格汉化
		search : true, // 显示搜索框
		sidePagination: "client", // 服务端处理分页
		columns : [
			{title : '全选',	checkbox : true,align : 'center',valign : 'middle'},
			{title : 'id',	field : 'uuid',	align : 'center',sortable : true,valign : 'middle'},
			{title : '数据库',field : 'databaseUuid',sortable : true,align : 'center'},
			{title : '类型',field : 'typeUuid',sortable : true,align : 'center'},
			{title : '表名',field : 'tableName',align : 'center',sortable : true,valign : 'middle'},
			{title : '表含义',field : 'tableDisc',align : 'center',sortable : true,valign : 'middle'},
			{title : '排序',field : 'tableOrder',align : 'center',sortable : true,valign : 'middle'},
			{title : '表数据量',field : 'tableRows',sortable : true,align : 'center'},
			{title : '数据库表大小',field : 'tableSpace',sortable : true,align : 'center'},
			{title : '描述',field : 'discription',sortable : true,align : 'center'}
		]
	});
	// 窗口大小改变时 重设表头
	$(window).resize(function() {
		$('#db_colum_datagrid').bootstrapTable('resetView');
	});
	
	// 数据库列表下拉
	ajaxPost('/sysDatabaseInfo/findAll', null, successSearchDatabaseInfo, null, findError);
	// 表类型列表下拉
	ajaxPost('/sysTableTypeInfo/findAll', null, successSearchTableTypeInfo, null, findError);

});

// 创建表成功
function successSaveSysTableInfo(result){
	$("#db_table_datagrid").bootstrapTable('load',result); 
}
//数据库列表下拉
function successSearchDatabaseInfo(result){
	jQuery('#add_table_addrName').append('<option value=""></option>');
	jQuery.each(result, function(index, value) {
		var addr = '<option value="' + value.uuid + '">' + value.databaseName + '</option>';
		jQuery('#add_table_addrName').append(addr);
	});
}
//表类型列表下拉
function successSearchTableTypeInfo(result){
	jQuery('#add_table_typeName').append('<option value=""></option>');
	jQuery.each(result, function(index, value) {
		var type = '<option value="' + value.uuid + '">' + value.typeName + '</option>';
		jQuery('#add_table_typeName').append(type);
	});
}



function successDeleteSysTableInfo(){
	$('#db_colum_datagrid').bootstrapTable('refresh');
}