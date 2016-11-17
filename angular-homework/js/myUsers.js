 var myApp= angular.module('myApp', []);
myApp.controller('userCtrl',["$scope","$http","tools",function($scope,$http,tools) {
	//设置默认查询方式
	$scope.search='id';
	//绑定查询输入框
	$scope.inputval1='';
	$scope.noChange=false;
	//设置当前操作对象的显示
	$scope.currentuser={
		"id": '',
		"Name":"",
		"age":''
	};
	//设置是否显示创建提示
	$scope.iscreat=false;
	//设置默认排序方式
	$scope.sort="id";
	//数据
	$scope.users = [];
	//请求数据
	$http.get("server.php").success(function(data){
		$scope.users=data;
	})
	//操作数据
	$scope.editUser=function(id){
		$scope.iscreat=!$scope.iscreat;
		$scope.noChange=!$scope.noChange;
		var key =tools.searid($scope.users,id);
		tools.copy($scope.currentuser,$scope.users[key]);
	}
	//保存数据
	$scope.saveChange=function(){
		var key =tools.searid($scope.users,$scope.currentuser.id);
		tools.copy($scope.users[key],$scope.currentuser);
		tools.init($scope);
		$scope.noChange=!$scope.noChange;
		$scope.iscreat=!$scope.iscreat;
	}
	//删除数据
	$scope.removeuser=function(){
		var key =tools.searid($scope.users,$scope.currentuser.id);
		$scope.users.splice(key,1);
		tools.init($scope);
		$scope.noChange=!$scope.noChange;
		$scope.iscreat=!$scope.iscreat;
	}
	//创建新用户；
	$scope.creatuser=function(){
		var key=true;
		if($scope.currentuser.id&&$scope.currentuser.Name&&$scope.currentuser.age){
			if(tools.searid($scope.users,$scope.currentuser.id)!=-1){
				key=false;
			}
			if(key){
					$scope.users.push($scope.currentuser);
					tools.init($scope);
			}else{
				alert("id被占用");
				tools.init($scope);
				return;
			}
			
		}else{
			tools.init($scope);
			alert("每一项都不能为空");
			return;
		}
		
	}
}]);
myApp.service("tools",function(){
	//重置当前显示数据
	this.init=function(scope){
		scope.currentuser={
			"id": '',
			"Name":"",
			"age":''
		};
	};
	//查找id匹配的对象
	this.searid=function(arr,id){
		var index=-1;
		angular.forEach(arr,function(val,key){
			if(val.id==id){
				index=key;
			}
		})
		return index;
	}
	//复制对象值
	this.copy=function(obj1,obj2){
		angular.forEach(obj2,function(val,key){
			obj1[key]=val;
		})
	}
})
