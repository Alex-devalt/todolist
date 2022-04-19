import graphene
from graphene_django import DjangoObjectType
from graphene_django.filter import DjangoFilterConnectionField

from mainapp.models import Project, Todo
from users.models import User


class UserType(DjangoObjectType):
    class Meta:
        model = User
        filter_fields = {
            'username': ['exact', 'icontains', 'istartswith'],
            'first_name': ['exact', 'icontains'],
        }
        #fields = '__all__'
        interfaces = (graphene.relay.Node,)


class ProjectType(DjangoObjectType):
    class Meta:
        model = Project
        fields = '__all__'


class TodoType(DjangoObjectType):
    class Meta:
        model = Todo
        fields = '__all__'

    project_name = graphene.String()

    def __init__(self, *args, **kwargs):
        super().__init__(args, kwargs)
        self.project = None

    def resolve_project_name(self, info):
        return self.project.name


class Query(graphene.ObjectType):
    all_users = DjangoFilterConnectionField(UserType)
    all_projects = graphene.List(ProjectType)
    all_todos = graphene.List(TodoType)
    project_by_id = graphene.Field(ProjectType, id=graphene.Int(required=True))
    todos_by_author_username = graphene.List(TodoType, username=graphene.String(required=False))

    def resolve_todos_by_author_username(root, info, username=None):
        todos = Todo.objects.all()
        if username:
            todos = Todo.objects.filter(author__username=username)
        return todos

    def resolve_project_by_id(root, info, id):
        try:
            return Project.objects.get(id=id)
        except Project.DoesNotExist:
            return None

    # def resolve_all_users(root, info):
    #     return User.objects.all()

    def resolve_all_projects(root, info):
        return Project.objects.all()

    def resolve_all_todos(root, info):
        if not info.context.user.is_authenticated:
            return Todo.objects.filter(is_active=True)
        return Todo.objects.all()


class UserMutation(graphene.Mutation):
    class Arguments:
        username = graphene.String(required=True)
        first_name = graphene.String()
        email = graphene.String()

    user = graphene.Field(UserType)

    @classmethod
    def mutate(cls, root, info, username, first_name, email):
        user = User.objects.get(username=username)
        user.first_name = first_name
        user.email = email
        user.save()
        return UserMutation(user=user)


class Mutation(graphene.ObjectType):
    update_user = UserMutation.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)
