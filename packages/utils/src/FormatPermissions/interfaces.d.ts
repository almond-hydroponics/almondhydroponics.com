export interface FormattedPermission {
	[key: string]: boolean;
}

export interface FormattedPermissions {
	[key: string]: FormattedPermission;
}

export interface Permission {
	_id: string;
	type: string;
}

export interface ResourceAccessLevel {
	permissions: Permission[];
	resource: Resource;
	_id: string;

	[key: string]: any;
}

export interface UserRole {
	description: string;
	title: string;
	_id: string;
	resourceAccessLevels: ResourceAccessLevel[];
	userCount: number;
	deleted: boolean;
}
