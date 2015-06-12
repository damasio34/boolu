/*
    Form Helper
    Serviço que centraliza as operações básicas de um formulário de inclusão/alteração de uma entidade.
*/
(function(angular) {
    var app = angular.module('anywhere.services');
    app.service('FormHelperService', function(EventManager, AppNotificationsService, $modal, $location, focusService, kDialogo, ConfiguracoesService) {
        
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
            EventManager.notify("salvarInclusao_init");
            return $modelService.incluir(model).then(function(data) {
                var exibiu = AppNotificationsService.popupResponse(data);
                if (!exibiu) AppNotificationsService.logSuccess('Item incluído com sucesso');
                if (data.getResponse().Ok === true) $location.path(self.defaultRoute);
                EventManager.notify("salvarInclusao_end");
            }, function(ex) {
                //AppNotificationsService.showException(ex);
                throw ex;
            });
        };
        var _confirmar = function($scope, template, modelController) {
            var modalInstance = $modal.open({
                templateUrl: template || 'modal.html',
                size: 'md',
                backdrop: 'static', // impede de fechar o popup clicando fora do modal.
                scope: $scope,
                resolve: {
                    model: modelController,
                },
                controller: function($scope, $modalInstance, model) {
                    $scope.Model = model;
                    $scope.confirmar = function() {
                        $modalInstance.close($scope.Model);
                    };
                    $scope.cancelar = function() {
                        $modalInstance.dismiss('cancel');
                    };
                },
            });
            return modalInstance.result;
        };
        // Realiza o processo de alteração do modelo imperativamente.
        var _salvarAlteracao = function(model, $modelService, $scope) {
            EventManager.notify("salvarAlteracao_init");
            return $modelService.alterar(model).then(function(data) {
                var exibiu = AppNotificationsService.popupResponse(data);
                if (!exibiu) AppNotificationsService.logSuccess('Item alterado com sucesso');
                $scope.OriginalModel = angular.copy(model);
                EventManager.notify("salvarAlteracao_end");
            }, function(ex) {
                //AppNotificationsService.showException(ex);
                throw ex;
            });
        };
        // Verifica se os campos do formulario atendem as regras estabelecidas.
        var _formularioEhValido = function($scope) {
            if (!$scope.Formulario) throw "Objeto Formulário não definido";
            return $scope.Formulario.$valid;
        };
        var _canSubmit = function($scope) {
            return $scope.formularioEhValido() && $scope.usuarioAlterouFormulario();
        };
        // Determina o que fazer quando o usuário submter o formulário.
        var _submitForm = function($scope) {
            if ($scope.formularioEhValido()) {
                if ($scope.modoEdicao) {
                    if (!$scope.usuarioAlterouFormulario()) {
                        AppNotificationsService.logWarning('Não há alterações a serem salvas.');
                        return;
                    };
                    return $scope.salvarAlteracao();
                } else return $scope.salvarInclusao();
            }
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
        //Utilizando o servico focusService este método aplica o foco no controle de acordo com a chave 
        //de procura
        var _setFocus = function(chave) {
            focusService(chave);
        };
        var _setFocusById = function(id) {
            setTimeout("var ctrl = jQuery('#" + id + "')[0]; ctrl.focus(); ctrl.select();", 100);
        };
        var _setFocusLookup = function(id) {
            setTimeout("var ctrl = jQuery('#" + id + "').find('input:text')[0]; ctrl.focus(); ctrl.select();", 100);
        };
        var _isNullOrUndefined = function(objeto) {
            return objeto == null || objeto == undefined;
        };
        // Determina comportamento que o formulário terá quando o usuário clicar em 'Sair'.
        var _sair = function(urlToRedirect, $scope) {
            if ($scope.usuarioAlterouFormulario()) {
                // confirma se o usuário quer perder os dados não salvos.
                var modalInstance = $modal.open({
                    templateUrl: "myModalContent.html",
                    controller: 'ModalInstanceCtrl',
                    resolve: {
                        Model: function() {
                            return $scope.Model;
                        }
                    }
                });
                modalInstance.result.then(function() {
                    $location.path(urlToRedirect);
                });
            } else $location.path(urlToRedirect);
        };
        var _editByid = function(id, $scope, $modelService, configuracoesService) {
            $scope.modoEdicao = true;

            //cria função padrão para obter o registro solicitado
            
            var obterRegistro = function(id, $scope, $modelService, sucesso, erro) {
                $modelService.getById(id).then(function(model) {
                    var hasValue = model.getResponse().HasValue != null;
                    
                    if (hasValue)
                        $scope.edit(model);                        
                    
                    sucesso(model, model.getResponse(), hasValue);

                }, function(ex) {
                    var detalhes = ex ? '<br /><br />' + ex : '';
                    erro(ex);
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
                else 
                    obterRegistro(id, $scope, $modelService, sucesso, erro);
            });
        };
        var _edit = function(model, $scope) {
            $scope.carregado = true;
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

        var _novoRegistro = function(defaultModel, $scope, $modelService, configuracoesService) {

            var obterNovoRegistro = function (defaultModel, $scope, $modelService, sucesso, erro) {
                $modelService.novo().then(function (model) {
                    var hasValue = model.getResponse().HasValue != null;

                    if (hasValue) {
                        _setModel(model, $scope);
                    }

                    sucesso(model, model.getResponse(), hasValue);

                }, function (ex) {
                    var detalhes = ex ? '<br /><br />' + ex : '';
                    erro(ex);
                });
            };

            if (defaultModel) {
                _setModel(defaultModel, $scope);
                return;
            }

            return new Promise(function(sucesso, erro) {
                if ($scope.$config) {
                    configuracoesService.getByKey($scope.$config).then(function(result) {
                        $scope.$config = result;
                        obterNovoRegistro(defaultModel, $scope, $modelService, sucesso, erro);
                    });
                }
                else 
                    obterNovoRegistro(defaultModel, $scope, $modelService, sucesso, erro);
            });
            
        };

        this.applySettings = function($controller, $scope, $modelService) {
            if (!$scope) throw "Variável '$scope' precisa ser definda";
            //if(!$scope.Formulario)
            //  throw "Objeto formulario não definido, por convenção toda teg form deve ter o nome formulario";
            $modelService.setErrorHandler(AppNotificationsService.showException);
            $scope.showSuccessOnSubmit = $scope.showSuccessOnSubmit || false;
            $scope.enabledValidations = true;
            $scope.mostrarRecursoDeDesabilitarValidacao = 'localhost' == $location.host();
            //$scope.OriginalModel = angular.copy(self.scope.Model);
            $scope.salvarInclusao = function() {
                return _salvarInclusao($scope.Model, $modelService, $scope);
            };
            $scope.salvarAlteracao = function() {
                return _salvarAlteracao($scope.Model, $modelService, $scope);
            };
            $scope.formularioEhValido = function() {
                return _formularioEhValido($scope);
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
            $scope.setFocus = function(chave) {
                return _setFocus(chave);
            };
            $scope.setFocusById = function(id) {
                return _setFocusById(id);
            };
            $scope.setFocusLookup = function(id) {
                return _setFocusLookup(id);
            };
            $controller.editById = function(id) {
                return _editByid(id, $scope, $modelService, ConfiguracoesService);
            };
            $controller.novoRegistro = function(model) {
                return _novoRegistro(model, $scope, $modelService, ConfiguracoesService);
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
            $scope.JSON = {
                stringify: function(json, replacer, space) {
                    return JSON.stringify(json, replacer, space || 2);
                },
            };
            $scope.MessageBox = kDialogo;
        };
        // -------------------------------------------------------
        // Incluido para tornar possível a exclusão do modelo direto na página de edição
        // Abre o modal de exclusão
        var _excluirModal = function(id, urlToRedirect, $scope, $modelService) {
            var modalInstance = $modal.open({
                templateUrl: "myModalContent.html",
                controller: 'ModalInstanceCtrl',
                resolve: {
                    Model: function() {
                        return $modelService.getById(id).then(null, AppNotificationsService.showException);
                    }
                }
            });
            modalInstance.result.then(function() {
                $modelService.removerPeloId(id).then(function() {
                    var exibiu = AppNotificationsService.popupResponse(data);
                    if (!exibiu) AppNotificationsService.logSuccess('Item excluído com sucesso.');
                    $scope.sair(urlToRedirect);
                }); //AppNotificationsService.showException);
            }, function() {});
        };
        // -----------------------------------------------------------
    });
})(angular);