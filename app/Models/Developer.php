<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Developer extends Model
{
    use HasFactory; 
    use SoftDeletes;
    
    protected $table = 'developers';
    protected $fillable = [
        'nome',
        'sexo',
        'idade',
        'hobby',
        'datanascimento'
    ];
    protected $guarded = [
        'id'
    ];
    protected $casts = [
        'datanascimento' => 'date:Y-m-d',
    ];
    public $timestamps = true;
}
