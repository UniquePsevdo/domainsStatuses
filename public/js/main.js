angular.module('DomainsApp', []).
controller('appCtrl', function($scope, $http, $timeout, $location) {
	const apiUrl = $location.absUrl().indexOf('http://localhost:3000')>-1  ? 'http://localhost:3000/api/' : 'https://sheltered-cove-78030.herokuapp.com/api/';
	$scope.domainsResult = {};
	$scope.domainName = '';
	$scope.showDomainList = false;
	$scope.serverErrorMessage = null;
	$scope.serverError=false;
	$scope.getDomains = ()=>{
		if($scope.domainName!==''){
			$http.post(`${apiUrl}get-check-id`, {domainName:$scope.domainName}).then((res)=>{
				$scope.domainsResult = res.data;
				$scope.showDomainList = true;
			}, (err)=>{
				$scope.showDomainList = false;
				$scope.serverErrorMessage = err.statusText;
				$timeout(()=>{
					$scope.serverErrorMessage = null;
				},3000)
			});
		}
	};
});