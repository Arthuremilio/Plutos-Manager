package data;

import java.util.ArrayList;

import model.UsuarioModel;

public interface CRUD {
    public boolean incluir(UsuarioModel obj) throws Exception;
    public boolean editar(UsuarioModel obj) throws Exception;
    public boolean excluir(UsuarioModel obj) throws Exception;
    public ArrayList<UsuarioModel> listar (String pesquisa) throws Exception;
    public UsuarioModel obter (int id) throws Exception;
}
