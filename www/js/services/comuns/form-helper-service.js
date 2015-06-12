/*
    -- Form Helper --
    Serviço que centraliza as operações básicas de um formulário de inclusão/alteração de uma entidade.
*/
(function(angular) {

    var services = angular.module('boolu.services');
    services.service('FormHelperService', function($location) {

        var self = this;

        var _setDefaultRoute = function(defaultRoute) {
            self.defaultRoute = defaultRoute;
        };

        //Método Responsável por alternar o modo de Validação no Cliente, utilizado para modo Debug, para não validar os métodos no cliente
        var _habilitarOuDesabilitarValidacao = function($scope) {
            $scope.enabledValidations = !$scope.enabledValidations;
            return $scope.enabledValidations;
        };

        // Realiza o processo de inclusão do modelo imperativamente.
        var _salvarInclusao = function(model, $modelService, $scope) {

            return $modelService.incluir(model).success(function(data) {
                if (data.getResponse().Ok === true) $location.path(self.defaultRoute);
            }, function(ex) { throw ex; });

        };

        // Realiza o processo de alteração do modelo imperativamente.
        var _salvarAlteracao = function(model, $modelService, $scope) {

            return $modelService.editar(model).success(function(data) {
                $scope.OriginalModel = angular.copy(model);
            }, function(ex) { throw ex; });

        };

        var _canSubmit = function($scope) {
            return $scope.usuarioAlterouFormulario();
        };

        // Determina o que fazer quando o usuário submter o formulário.
        var _submitForm = function($scope) {
            if ($scope.modoEdicao) {
                if (!$scope.usuarioAlterouFormulario()) {
                    // AppNotificationsService.logWarning('Não há alterações a serem salvas.');
                    return;
                };
                return $scope.salvarAlteracao();
            } else return $scope.salvarInclusao();
        };

        // verifica se há alterações a serem desfeitas no formulario.
        var _usuarioAlterouFormulario = function($scope) {
            return !angular.equals($scope.Model, $scope.OriginalModel);
        };

        // Desfaz as alterações realizadas no formulário.
        var _desfazerAlteracoesDoUsuario = function($scope) {
            angular.copy($scope.OriginalModel, $scope.Model);
            return $scope.Formulario.$setPristine();
        };

        var _isNullOrUndefined = function(objeto) {
            return objeto == null || objeto == undefined;
        };

        // Determina comportamento que o formulário terá quando o usuário clicar em 'Sair'.
        // var _sair = function(urlToRedirect, $scope) {
        //     if ($scope.usuarioAlterouFormulario()) {
        //         // confirma se o usuário quer perder os dados não salvos.
        //         var modalInstance = $modal.open({
        //             templateUrl: "myModalContent.html",
        //             controller: 'ModalInstanceCtrl',
        //             resolve: {
        //                 Model: function() {
        //                     return $scope.Model;
        //                 }
        //             }
        //         });
        //         modalInstance.result.then(function() {
        //             $location.path(urlToRedirect);
        //         });
        //     } else $location.path(urlToRedirect);
        // };

        var _editByid = function(id, $scope, $modelService) {
            $scope.modoEdicao = true;

            //cria função padrão para obter o registro solicitado
            var obterRegistro = function(id, $scope, $modelService, sucesso, erro) {
                $modelService.getById(id).success(function(model) {
                    var hasValue = !!model;

                    if (hasValue) $scope.edit(model);

                    sucesso(model, model, hasValue);

                }, function(ex) {
                    throw ex;
                });
            };

            //cria prmoise que pode ser utilizada pelo desenvolvedor para controlar o momento
            //do retorno da resposta, incluindo a possibilidade de retornar as configurações carregadas
            return new Promise(function(sucesso, erro) {
                if ($scope.$config) {
                    configuracoesService.getByKey($scope.$config).then(function(result) {
                        $scope.$config = result;
                        obterRegistro(id, $scope, $modelService, sucesso, erro);
                    })
                }
                else obterRegistro(id, $scope, $modelService, sucesso, erro);
            });
        };
        var _edit = function(model, $scope) {
            // $scope.carregado = true;
            $scope.modoEdicao = true;
            $scope.Model = model;
            $scope.OriginalModel = angular.copy(model);
        };

        var _setModel = function (defaultModel, $scope) {
            var novoModel = defaultModel || {};
            $scope.Model = novoModel;
            $scope.OriginalModel = angular.copy(novoModel);
            $scope.carregado = true;
        };

        this.applySettings = function($controller, $scope, $modelService) {
            if (!$scope) throw "Variável '$scope' precisa ser definda";

            // $modelService.setErrorHandler(AppNotificationsService.showException);

            $scope.enabledValidations = true;

            $scope.salvarInclusao = function() {
                return _salvarInclusao($scope.Model, $modelService, $scope);
            };
            $scope.salvarAlteracao = function() {
                return _salvarAlteracao($scope.Model, $modelService, $scope);
            };
            $scope.canSubmit = function() {
                return _canSubmit($scope);
            };
            $scope.submitForm = function() {
                return _submitForm($scope);
            };
            $scope.usuarioAlterouFormulario = function() {
                return _usuarioAlterouFormulario($scope);
            };
            $scope.desfazerAlteracoesDoUsuario = function() {
                return _desfazerAlteracoesDoUsuario($scope);
            };
            $scope.sair = function(urlToRedirect) {
                return _sair(urlToRedirect, $scope)
            };
            $scope.edit = function(model) {
                return _edit(model, $scope);
            };
            $controller.editById = function(id) {
                return _editByid(id, $scope, $modelService);
            };
            $controller.novoRegistro = function(model) {
                return _novoRegistro(model, $scope, $modelService);
            };
            $controller.isNullOrUndefined = function(objeto) {
                return _isNullOrUndefined(objeto);
            };
            $controller.setDefaultRoute = function(defaultRoute) {
                return _setDefaultRoute(defaultRoute);
            };
            $scope.habilitarOuDesabilitarValidacao = function() {
                return _habilitarOuDesabilitarValidacao($scope);
            };
            $scope.ExcluirModal = function(id, urlToRedirect) {
                return _excluirModal(id, urlToRedirect, $scope, $modelService);
            };
            $controller.confirmar = function(template, modelController) {
                return _confirmar($scope, template, modelController);
            };

            // $scope.MessageBox = kDialogo;
        };

        // // -------------------------------------------------------
        // // Incluido para tornar possível a exclusão do modelo direto na página de edição
        // // Abre o modal de exclusão
        // var _excluirModal = function(id, urlToRedirect, $scope, $modelService) {
        //     var modalInstance = $modal.open({
        //         templateUrl: "myModalContent.html",
        //         controller: 'ModalInstanceCtrl',
        //         resolve: {
        //             Model: function() {
        //                 return $modelService.getById(id).then(null, AppNotificationsService.showException);
        //             }
        //         }
        //     });
        //     modalInstance.result.then(function() {
        //         $modelService.removerPeloId(id).then(function() {
        //             var exibiu = AppNotificationsService.popupResponse(data);
        //             if (!exibiu) AppNotificationsService.logSuccess('Item excluído com sucesso.');
        //             $scope.sair(urlToRedirect);
        //         }); //AppNotificationsService.showException);
        //     }, function() {});
        // };
        // // -----------------------------------------------------------

    });

})(angular);